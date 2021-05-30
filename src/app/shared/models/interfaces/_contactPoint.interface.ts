import { ContactSystem } from "../enums/_contactSystem.enum";
import { ContactUse } from "../enums/_contactUse.enum";

export interface ContactPoint {
    contactSystem?: ContactSystem,
    contactValue?: string,
    contactUse?: ContactUse
}