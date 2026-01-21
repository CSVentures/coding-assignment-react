import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { TicketProvider } from '../context/TicketContext';
import Tickets from './tickets';

function renderTickets() {
  return render(
    <BrowserRouter>
      <TicketProvider>
        <Tickets />
      </TicketProvider>
    </BrowserRouter>,
  );
}

type MockResponse = {
  ok: boolean;
  status?: number;
  statusText: string;
  json?: () => Promise<unknown>;
};

function mockFetchSequence(responses: Array<MockResponse | Error>) {
  const fetchMock = jest.fn(async () => {
    const next = responses.shift();
    if (!next) {
      throw new Error('No more mocked fetch responses');
    }
    if (next instanceof Error) {
      throw next;
    }
    return next as unknown as Response;
  });

  (globalThis as unknown as { fetch: unknown }).fetch = fetchMock;
  return fetchMock;
}

describe('Tickets', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render ticket list with tickets', async () => {
    mockFetchSequence([
      {
        ok: true,
        statusText: 'OK',
        json: async () => [
          {
            id: 1,
            description: 'Fix login',
            assigneeId: null,
            completed: false,
          },
          {
            id: 2,
            description: 'Add feature',
            assigneeId: null,
            completed: true,
          },
        ],
      },
      {
        ok: true,
        statusText: 'OK',
        json: async () => [{ id: 1, name: 'Taylor Swift' }],
      },
    ]);

    renderTickets();

    expect(
      await screen.findByRole('heading', { name: /tickets/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText('Fix login')).toBeInTheDocument();
    expect(await screen.findByText('Add feature')).toBeInTheDocument();
  });

  it('should filter tickets by status', async () => {
    const user = userEvent.setup();

    mockFetchSequence([
      {
        ok: true,
        statusText: 'OK',
        json: async () => [
          { id: 1, description: 'Done', assigneeId: null, completed: true },
          { id: 2, description: 'Todo', assigneeId: null, completed: false },
        ],
      },
      { ok: true, statusText: 'OK', json: async () => [] },
    ]);

    renderTickets();

    expect(await screen.findByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Todo')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^complete$/i }));
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.queryByText('Todo')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^incomplete$/i }));
    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.queryByText('Done')).not.toBeInTheDocument();
  });

  it('should display API error message on failure', async () => {
    mockFetchSequence([
      { ok: false, statusText: 'Internal Server Error' },
      { ok: true, statusText: 'OK', json: async () => [] },
    ]);

    renderTickets();

    expect(
      await screen.findByText(/api error: internal server error/i),
    ).toBeInTheDocument();
  });
});
