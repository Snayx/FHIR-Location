import { OperationalStatus } from "./enums/_operational-status.enum";
import { Status } from "./enums/_status.enum";
import { Type } from "./enums/_type.enum";
import { PhysicalType } from "./enums/_physical-type.enum";
import { Address } from "./interfaces/_address.interface";
import { ContactPoint } from "./interfaces/_contactPoint.interface";

/**
 * Location interface created based on the FHIR Location type
 * http://www.hl7.org/fhir/location.html
 */

export interface Location {
    id?: string,
    status?: Status,
    operationalStatus?: OperationalStatus,
    name: string,
    description?: string,
    type?: Type[],
    telekom?: ContactPoint,
    address: Address,
    physicalType?: PhysicalType,
    managingOrganization?: string,
    partOf?: string,
}
