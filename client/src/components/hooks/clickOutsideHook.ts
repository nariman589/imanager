import { useEffect, useRef, useState } from "react";

export function useClickOutside() {
	const openRef = useRef<any>(null);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (openRef.current && !openRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openRef]);
	return { open, setOpen, openRef };
}
