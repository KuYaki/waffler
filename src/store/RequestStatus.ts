import { reactive } from "vue";
import { defineStore } from "pinia";
import { RequestStatus } from "@/api/http/status";

export const RequestStatusStore = defineStore('RequestStatus', () => {

    const status: RequestStatus = reactive(new RequestStatus());

    return { status };
})