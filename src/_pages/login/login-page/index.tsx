import { LoginForm } from "@/widgets/login-form"
import { LeftRightLayout } from "@/shared/layout"

export const Login = () => {
    return <LeftRightLayout leftColor={"#4c93cc"} rightColor={"white"} content={<LoginForm />} />
}
