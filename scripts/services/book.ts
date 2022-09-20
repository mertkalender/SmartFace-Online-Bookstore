fetch("https://www.dbooks.org/api/recent",
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
    }
);
const axios = require('axios').default;

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  url: string;
};

type GetBooksResponse = {
  data: {
    books: Book[];
    status: string;
    total: number;
  }
  status: number;
  statusText: string;
  headers: {};
  config: {};
  request: {};
};

export async function getBooks(): Promise<GetBooksResponse> {
    try {
      const response = await axios.get("https://www.dbooks.org/api/recent", {
        method: "GET",
      });
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }