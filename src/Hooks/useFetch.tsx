import { useEffect, useState } from "react";
import IRepos from '../types/repo'

function useFetch(url: string) {
  const [repos, setRepos] = useState<Array<IRepos>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
    .then(response => response.json())
    .then(repos => {
        console.log(repos)
        setRepos(repos)
    })
    .catch((err) => {
    setError(err);
    })
    .finally(() => {
    setLoading(false);
    });
  }, [url]);

  const filterRepos = (filterText: string) => {
    //   const test = repos.filter(repo => repo.name === filterText);
      let test = repos.filter(repo => repo.name.includes(filterText));

      if (test.length > 0) setRepos(test); 

      console.log('Repos ', test.length)

      return test;
  };

  return { repos, loading, error, filterRepos };
}

export default useFetch;
