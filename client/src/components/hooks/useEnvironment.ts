const useEnvironment = () => {
	const isProduction = process.env.REACT_APP_ENV === "production"

	return isProduction
}

export default useEnvironment
