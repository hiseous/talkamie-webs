'use client';

import { useEffect } from "react";
import { useDashboard } from "../dashboard-provider/useDashboard";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import SupportTicketBody from "./SupportTicketBody";
import SupportTicketFooter from "./SupportTicketFooter";
import { useGetSupportOpenTicketApi } from "../../utils/api/support-ticket/get";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { supportTicketProps } from "../../utils/types/support";

const SupportMessagesPage = () => {
    const dashboard = useDashboard();
    const localUser = useLocalUser();
    const getApi = useGetSupportOpenTicketApi();

    const ticket = {
        ...(
            dashboard?.supportTickets.currentTicketId ?
            dashboard?.supportTickets.records?.[dashboard?.supportTickets.currentTicketId] :
            undefined
        ),
    };
    const handles = {
        updateSupportTicket: (ticketProps?: supportTicketProps) => {
            if(dashboard?.supportTickets.currentTicketId){
                dashboard?.supportTickets.updateSupportTicketPropsOnly(dashboard.supportTickets.currentTicketId, ticketProps);
            }
            // setChat(prev => ({
            //   ...prev,
            //   ...ticketProps,
            // }));
        },
    };
    
    useEffect(() => {
        if(!dashboard?.navs.hideMobileNavsOnPage){
            dashboard?.navs.updateStates({hideMobileNavsOnPage: true});
        }
        if(!dashboard?.supportTickets.currentTicketId){
            if(localUser?.id){
                getApi.trigger();
            }
        }
    }, []);
    useEffect(() => {
        if(getApi.loading === false && getApi.success){
            if(!dashboard?.supportTickets?.currentTicketId) dashboard?.supportTickets.setSupportTicketPropsOnly(getApi.data);
        }
    }, [getApi.loading]);
    
    return (
        <>
            <div className="flex flex-col h-full">
                <HeadingAndBackButtonVar1 className="sticky top-3">
                    Help and Support
                </HeadingAndBackButtonVar1>
                <SupportTicketBody
                    ticket={ticket}
                    updateTicket={handles.updateSupportTicket}
                />
                <SupportTicketFooter
                    ticket={ticket}
                    updateTicket={handles.updateSupportTicket}
                    className="sticky bottom-0"
                />
            </div>
        </>
    );
}

export default SupportMessagesPage;