import { productSuggestions } from 'react-storefront-connector'

export default async function(req, res) {
  //Getting product
  const { productId } = req;

  const productsResponse = await fetch('https://fakestoreapi.com/products')
  const rawResults = await productsResponse.json()
  const mapOfSuggestedProds = rawResults.map(rsp => ({
    // info for the product.  You can add to this as needed.
    id: rsp.id.toString(), // the product id
    url: `/p/${rsp.id}`, // the URL for the product page
    name: rsp.title, // the name of the product
    price: Number(rsp.price), // the price as a number
    priceText: `$${rsp.price}`, // the price as formatted text with currency
    rating: Math.random() * (5 - 1) + 1, // the product rating
    description: rsp.description, // the product description
    specs: null, // the product specs - this is just a suggestion.  Feel free to add any additional fields needed for the UI.
    thumbnail: {
      // an array of thumbnails to display below the main image carousel
      src: rsp.image, // the thumbnail URL
      alt: `Product Thumbnail ${rsp.id}`, // alt text for the thumbnail
    },
    sizes: [],
    colors: [],
  }));

  return res.json(mapOfSuggestedProds)
}
