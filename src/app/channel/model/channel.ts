import { Login } from "../../login/model/login";
export class Channel {
    id: string;
    name: string;
    member: Array<Login>;
    messageToken: string;
}