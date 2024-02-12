import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CountryList from "./components/CountryList";
import { useState } from "react";

const clientConfig = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [search,setSearch] = useState<string>('');
  

  return (
    <ApolloProvider client={clientConfig}>
      <div>
        {/* input kısmı */}
        <div className="flex justify-center mx-auto p-7 shadow">
          <input
            type="text"
            className="ps-3 w-2/5 border-4 rounded outline-none"
            onChange={(e)=> setSearch(e.target.value)}
          />
        </div>

        {/* listelenen ögeler */}
        <div>
          <CountryList search={search} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
