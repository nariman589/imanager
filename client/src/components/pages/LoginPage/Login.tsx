import { useAuth } from "components/hooks/useAuth";
import { Button } from "components/ui/Button/Button";
import { Loader } from "components/ui/Loader/Loader";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Logo } from "components/layouts/NavBar/Header/components";
import logo from "assets/logo.svg";
import useEnvironment from "components/hooks/useEnvironment";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
	const isProduction = useEnvironment();

	const [isLoading, setIsLoading] = useState(false);

	const [userLogin, setLogin] = useState("");
	const [userPassword, setPassword] = useState("");

	const authActions = useAuth();

	const navigation = useNavigate();

	const handleAuth = () => {
		authActions.getUser && authActions.getUser(userLogin);
		navigation("/");
	};

	const connect = async (login: string, password: string) => {
		try {
			const response = await axios.post(
				window.location.origin + "/ws/connect",
				{
					login,
					password,
				}
			);
			if (response.data) {
				authActions.getUser && (await authActions.getUser(userLogin));
			} else {
				toast.error("Неверный логин/пароль");
			}
		} catch (err) {
			toast.error("Неверный логин/пароль");
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogin = () => {
		if (!userLogin) {
			toast.warn("Заполните учетную запись!");
			return;
		} else if (!userPassword) {
			toast.warn("Заполните пароль!");
			return;
		}
		setIsLoading(true);
		connect(userLogin, userPassword);
		navigation("/");
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") {
			handleLogin();
		}
	};

	return (
		<main className={styles.loginPage}>
			{isLoading && <Loader />}

			<div className={styles.loginPageContainer}>
				<section className={styles.loginPageFigure}>
					<Logo src={logo} />
				</section>

				<section className={styles.loginPageTitle}>
					<h1>Вход в систему HR процессов</h1>
					<label>Введите логин/пароль от Вашей учетной записи</label>
					{!isProduction && (
						<h1 className={styles.loginPageTest}>Тестовая среда</h1>
					)}
				</section>

				<section className={styles.loginPageForm}>
					<div className={styles.loginPageFormItem}>
						<div className={styles.loginPageFormInputContainer}>
							<input
								type="text"
								placeholder="Учетная запись"
								defaultValue={userLogin}
								onChange={(e) => setLogin(e.target.value.trim())}
								disabled={isLoading}
							/>
						</div>
					</div>
					<div className={styles.loginPageFormItem}>
						<div className={styles.loginPageFormInputContainer}>
							<input
								type="password"
								placeholder="Пароль"
								defaultValue={userPassword}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
								onKeyDown={handleKeyDown}
								// disabled={true}
							/>
						</div>
					</div>

					<div className={styles.loginPageFormButton}>
						<Button
							type="submit"
							onClick={handleLogin}
							fontsize="16px"
							disabled={isLoading}
						>
							{isLoading ? "Пожалуйста подождите..." : "Войти"}
						</Button>

						{process.env.REACT_APP_ENV !== "production" && (
							<Button
								type="submit"
								onClick={handleAuth}
								fontsize="16px"
								disabled={isLoading}
								width="100%"
							>
								{isLoading
									? "Пожалуйста подождите..."
									: "Войти без пароля(тест)"}
							</Button>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}

export default Login;
