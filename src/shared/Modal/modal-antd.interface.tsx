export interface IModal {
    visible: boolean;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onOk: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCancel: any;
    footer: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}
