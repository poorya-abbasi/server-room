import { z, SafeParseReturnType } from "zod";

export default function useValidateByType(
    sensorType: string,
    body: { value: number }
): SafeParseReturnType<any, any> {
    if (sensorType === "electric") {
        return z
            .object({
                value: z.number().min(0, { message: "Value must be positive" }),
            })
            .safeParse(body);
    } else if (sensorType === "condition") {
        return z
            .object({
                value: z.number(),
            })
            .safeParse(body);
    } else if (sensorType === "event") {
        return z
            .object({
                value: z.boolean(),
            })
            .safeParse(body);
    }
    return z.never().safeParse(body);
}
