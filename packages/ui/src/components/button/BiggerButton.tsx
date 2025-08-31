import Button, { ButtonProps } from "./Button";

type BiggerButtonProps = ButtonProps;

const BiggerButton = (props: BiggerButtonProps) => {
    
    return (
        <Button
            {...props}
            className={`${props.className || ''} block mx-auto md:px-32 py-6 md:py-12 font-medium rounded-full text-center w-full md:max-w-[1200px] text-xl md:text-4xl 2xl:text-5xl`}
        />
    );
}

export default BiggerButton;