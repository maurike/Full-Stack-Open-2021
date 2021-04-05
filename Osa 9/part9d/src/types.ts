interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseHasDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseHasDescription {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseHasDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseHasDescription {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
