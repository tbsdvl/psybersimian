export const Paragraph = ({ textStyle, text }: {textStyle: string, text: string }) => {
    return (
        <>
            <p className={textStyle}>{text}</p>
        </>
    );
}