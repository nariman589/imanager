import { FC, ReactNode } from "react"

import styles from "./Button.module.css"

type CommonButtonProps = {
	children: ReactNode
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	disabled?: boolean
	active?: boolean
	width?: string
	height?: string
	fontsize?: string
	icon?: ReactNode
	type?: "button" | "submit" | "reset"
	form?: string
}

type IconButtonProps = CommonButtonProps & {
	icon?: ReactNode
}

type WithoutButtonProps = CommonButtonProps & {
	icon?: never
}

type ButtonProps = IconButtonProps | WithoutButtonProps

const ButtonActions: FC<ButtonProps> = ({
	children,
	onClick,
	disabled = false,
	active = false,
	width = "120px",
	height = "32px",
	fontsize = "12px",
	icon,
	type = "button",
	form,
	...attrs
}) => {
	const {
		btn__actions,
		btn__actions__disabled,
		btn__actions__content,
		btn__actions__content__icon,
	} = styles
	return (
		<button
			{...attrs}
			type={type}
			className={`${disabled ? btn__actions__disabled : btn__actions}`}
			style={
				active
					? {
							width: width,
							height: height,
							fontSize: fontsize,
							backgroundColor: "#fe5000",
							color: "#fafafa",
							opacity: 0.7,
					  }
					: {
							width: width,
							height: height,
							fontSize: fontsize,
					  }
			}
			disabled={disabled}
			form={form}
			onClick={(e) => {
				onClick(e)
			}}
		>
			<div className={btn__actions__content}>
				{icon && <div className={btn__actions__content__icon}>{icon}</div>}
				<div>{children}</div>
			</div>
		</button>
	)
}

export { ButtonActions }
