export enum THEMES {
    ACTION = "ACTION",
    SOCIAL = "SOCIAL",
    PERSONAL = "PERSONAL",
    TENSION = "TENSION",
    MYSTERY = "MYSTERY"
}

export type Character = {

    name: string;
    index: number
    notes?: string;

    identity?: string;
    characteristics?: string[];
    specialTrait?: string

}