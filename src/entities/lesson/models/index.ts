export type LessonType =
    | {
          type: "shared"
      }
    | {
          type: "devided"
          subgroup: number
      }
