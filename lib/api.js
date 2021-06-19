export function getStrapiURL(path='') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

// ------- Fetch with GraphQL -------

// ======= Handle general requests to Strapi =======
async function fetchAPIGraphql(query, { variables } = {}) {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const jsonStrapi = await response.json();

  if (jsonStrapi.errors) {
    console.error(jsonStrapi.errors);
    throw new Error('Failed to fetch API');
  }

  return jsonStrapi.data;
}

// ======= Handle particular requests to Strapi =======

// Get Global data
export async function getGlobalData() {
  const data = await fetchAPIGraphql(
    `
    query {
      global {
        siteName
        defaultSeo {
          metaTitle
          metaDescription
          shareImage {
            name
            alternativeText
            width
            height
            url
          }
        }
      }
    }
    `
  );
  return data?.global;
}

// ======= Get data for Singles (Pages) =======

// Get Homepage Data
export async function getHomepageData() {
  const data = await fetchAPIGraphql(
    `
    query {
      homepage {
        seo {
          metaTitle
          metaDescription
          shareImage {
            name
            alternativeText
            mime
            width
            height
            url
            formats
          }
        }
        hero {
          title
          image {
            name
            alternativeText
            caption
            mime
            width
            height
            url
            formats
          }
        }
        homePromos {
          id
          title
          url
          description
          medium {
            name
            alternativeText
            caption
            mime
            size
            width
            height
            url
            formats
          }
        }
      }
    }
    `
  );
  return data?.homepage;
}

// Get Articles data for Homepage Cards
export async function getArticlesForHomeCards() {
  const data = await fetchAPIGraphql(
    `
    query ArticlesForHome($where: JSON) {
      articles(where: $where, sort: "publishedAt:desc", limit: 6) {
        slug
        title
        publishedAt
        description
        category {
          name
        }
        labels {
          name
        }
        image {
          name
          alternativeText
          width
          height
          url
          formats
        }
      }
    }
    `,
    {
      variables: {
        where: {
          status: "published"
        }
      }
    }
  );
  return data?.articles;
}

// Get Aboutpage data
export async function getAboutPageData() {
  const data = await fetchAPIGraphql(
    `
    query {
      aboutpage {
        title
        description
        imageGroup {
          id
          name
          alternativeText
          caption
          size
          width
          height
          url
          formats
        }
        aboutContentBlocks {
          id
          title
          content
          mediaGroup {
            id
            name
            alternativeText
            caption
            mime
            size
            width
            height
            url
            formats
          }
        }
      }
    }
    `
  );
  return data?.aboutpage;
}

// Get Policy Privacy data
export async function getPolicyPrivacyData() {
  const data = await fetchAPIGraphql(
    `
    query {
      policyPrivacy {
        title
        description
        content
      }
    }
    `
  );
  return data?.policyPrivacy;
}

// Get Policy Cookies data
export async function getPolicyCookiesData() {
  const data = await fetchAPIGraphql(
    `
    query {
      policyCooky {
        title
        description
        content
      }
    }
    `
  );
  return data?.policyCooky;
}

// Get Terms Use data
export async function getTermsUseData() {
  const data = await fetchAPIGraphql(
    `
    query {
      termsUse {
        title
        description
        content
      }
    }
    `
  );
  return data?.termsUse;
}

// ======= Get Data for Static Paths of Collections (Pages) =======

// GET slugs of all Articles
export async function getSlugsOfArticles() {
  const data = await fetchAPIGraphql(
    `
    query {
      articles {
        slug
      }
    }
    `
  );
  return data?.articles;
}

// GET slugs of all Categories (needed also for Navbar)
export async function getSlugsOfCategories() {
  const data = await fetchAPIGraphql(
    `
    query {
      categories {
        name
        slug
      }
    }
    `
  );
  return data?.categories;
}

// GET slugs of all Labels
export async function getSlugsOfLabels() {
  const data = await fetchAPIGraphql(
    `
    query {
      labels(sort: "name:asc") {
        name
        slug
      }
    }
    `
  );
  return data?.labels;
}


// ======= Get data for Collections (Pages) =======

// Get data for each Article Page
export async function getArticleBySlug(slug) {
  const data = await fetchAPIGraphql(
    `
    query ArticleBySlug($where: JSON) {
      articles(where: $where) {
        slug
        title
        description
        publishedAt
        updatedAt
        contentBlocks {
          id
          title
          content
          mediaGroup {
            id
            name
            alternativeText
            caption
            mime
            size
            width
            height
            url
            formats
          }
          outlinksBlocks {
            id
            title
            outlinks {
              id
              name
              url
            }
          }
          promos {
            id
            title
            url
            description
            medium {
              name
              alternativeText
              caption
              mime
              size
              width
              height
              url
              formats
            }
          }
        }
        category {
          name
          slug
        }
        labels {
          name
          slug
        }
        author {
          name
          picture {
            name
            alternativeText
            mime
            width
            height
            url
            formats
          }
        }
        image {
          url
        }
      }
    }
    `,
    {
      variables: {
        where: {
          slug,
          status: "published"
        }
      }
    }
  );
  return data?.articles;
}

// Get data for each Category Page
export async function getCategoryBySlug(slug) {
  const data = await fetchAPIGraphql(
    `
    query CategoryBySlug($where: JSON, $where_art: JSON) {
      categories(where: $where) {
        slug
        name
        description
        articles(where: $where_art, sort: "publishedAt:desc") {
          slug
          title
          description
          publishedAt
          image {
            name
            alternativeText
            width
            height
            url
            formats
          }
        }
        outlinksBlocks {
          id
          title
          outlinks {
            id
            name
            url
          }
        }
        promos {
          id
          title
          url
          description
          medium {
            name
            alternativeText
            caption
            mime
            size
            width
            height
            url
            formats
          }
        }
        image {
          url
        }
      }
    }
    `,
    {
      variables: {
        where: {
          slug
        },
        where_art: {
          status: "published"
        }
      }
    }
  );
  return data?.categories;
}

// Get data for each Label Page
export async function getLabelBySlug(slug) {
  const data = await fetchAPIGraphql(
    `
    query getLabelBySlug($where: JSON, $where_art: JSON) {
      labels(where: $where) {
        slug
        name
        description
        articles(where: $where_art, sort: "publishedAt:desc") {
          slug
          title
          description
          publishedAt
          image {
            name
            alternativeText
            width
            height
            url
            formats
          }
        }
      }
    }
    `,
    {
      variables: {
        where: {
          slug
        },
        where_art: {
          status: "published"
        }
      }
    }
  );
  return data?.labels;
}
