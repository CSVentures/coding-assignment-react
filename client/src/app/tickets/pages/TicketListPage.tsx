import { useContext } from "react";
import { FiltersBars } from "../components/FiltersBars";
import { TableList } from "../components/TableList";
import { TicketsContext } from "../context";
import useQueries from "../../hooks/useQueries";
import { PlusOutlined } from "@ant-design/icons";
import { useMobile } from "../../utils";
import { ModalCreateTicketMobile } from "../components/Modal/ModalCreateTicketMobile";
import { TicketListMobile } from "../components/TicketListMobile";
import { ModalCreateTicket } from "../components/Modal/ModalCreateTicket";
import { SideBar } from "../components/SideBar";
import { CurrentFilter } from "../components/CurrentFilter";
import { ButtonStyles } from "../../component/ButtonStyles";

export function TicketListPage() {
  const { replaceQuery } = useQueries();
  const { isMobile } = useMobile();
  const {
    tickets,
    isLoading,
    openModalCreateTicket,
    setOpenModalCreateTicket,
    createTicket,
    isLoadingCreate,
  } = useContext(TicketsContext);

  const handleFilterChange = (filters: { [key: string]: string }) => {
    replaceQuery({ ...filters });
  };

  return (
    <div className="flex flex-col gap-6 h-full p-6">
      <div
        className={`flex justify-between items-center mb-2 ${
          isMobile ? "flex-col gap-2 justify-start" : ""
        }`}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            Ticket Management
          </h1>
          <p className="text-gray-600">Manage and track your support tickets</p>
        </div>
        <div className="flex gap-3">
          <FiltersBars onFilterChange={handleFilterChange} />

          <ButtonStyles
            size={isMobile ? "middle" : "large"}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModalCreateTicket(true)}
            text="Create Ticket"
          />
        </div>
      </div>

      <div className="flex justify-between gap-2">
        {!isMobile && <SideBar onFilterChange={handleFilterChange} />}

        <div className="flex-1 overflow-y-auto">
          <div className="px-4">
            <CurrentFilter />
          </div>

          {isMobile ? (
            <TicketListMobile tickets={tickets} isLoading={isLoading} />
          ) : (
            <TableList tickets={tickets} isLoading={isLoading} />
          )}
        </div>
      </div>

      {isMobile ? (
        <ModalCreateTicketMobile
          open={openModalCreateTicket}
          onClose={() => setOpenModalCreateTicket(false)}
          onSubmit={createTicket}
          isLoading={isLoadingCreate}
        />
      ) : (
        <ModalCreateTicket
          open={openModalCreateTicket}
          onClose={() => setOpenModalCreateTicket(false)}
          onSubmit={createTicket}
          isLoading={isLoadingCreate}
        />
      )}
    </div>
  );
}
