fetch("https://www.dbooks.org/api/recent",
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
    }
);
export type Book = {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  url: string;
};

type GetBooksResponse = {
  results: Book[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

export async function getBooks(): Promise<GetBooksResponse> {
  try {
    const response: GetBooksResponse = await fetch("/?results=100", {
      method: "GET",
    });
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}