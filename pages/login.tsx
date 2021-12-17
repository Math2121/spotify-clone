import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
interface IProvider {
  providers: Provider;
}
function Login({ providers }: IProvider) {

  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img src="https://links.papareact.com/9xl" alt="" className="w-52 mb-5" />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
