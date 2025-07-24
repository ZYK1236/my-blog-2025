import { DataLoaderWrapper } from "../../data-loader";
import MdParse from "./component";

// http://localhost:8080/blogs 
const httpLoader = () => fetch('http://localhost:8080/blogs').then(res => res.text());

const MdParseWithDataLoader = () => {
  return (
    <DataLoaderWrapper httpLoader={httpLoader}>
      {(data, loading, error) => (
        <MdParse data={data} loading={loading} error={error} />
      )}
    </DataLoaderWrapper>
  )
}

export default MdParseWithDataLoader;