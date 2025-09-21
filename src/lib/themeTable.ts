import { Theme } from "./types";

export const themeTable = (
  firstPriority: string = "",
  secondPriority: string = "",
  thirdPriority: string = "",
  fourthPriority: string = "",
  fifthPriority: string = "",
  isCurrentlyOnFourth: boolean = true
) => ({
    1: firstPriority,
    2: firstPriority,
    3: firstPriority,
    4: firstPriority,
    5: secondPriority,
    6: secondPriority,
    7: thirdPriority,
    8: thirdPriority,
    9: thirdPriority,
    10: isCurrentlyOnFourth ? fourthPriority : fifthPriority,
    firstPriority,
    secondPriority,
    thirdPriority,
    fourthPriority,
    fifthPriority,
    isCurrentlyOnFourth
});

export function toggleLowestPriorityTheme(table: Theme) {

    return themeTable(table.firstPriority,
        table.secondPriority,
        table.thirdPriority,
        table.fourthPriority,
        table.fifthPriority,
        !table.isCurrentlyOnFourth
    )
}
    