import productsData from '@/services/mockData/products.json'

class ProductService {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...productsData]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const product = productsData.find(p => p.Id === parseInt(id))
    if (!product) {
      throw new Error('Product not found')
    }
    return { ...product }
  }

  async getFeatured() {
    await new Promise(resolve => setTimeout(resolve, 250))
    return productsData.filter(p => p.featured).map(p => ({ ...p }))
  }

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return productsData.filter(p => p.category === category).map(p => ({ ...p }))
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const searchTerm = query.toLowerCase()
    return productsData.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    ).map(p => ({ ...p }))
  }

  getCategories() {
    const categories = [...new Set(productsData.map(p => p.category))]
    return categories.sort()
  }

  getPriceRange() {
    const prices = productsData.map(p => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }
}

export default new ProductService()