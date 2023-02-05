import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { toyService } from './toy.service'

export const reviewService = {
  add,
  query,
  remove,
  getDefaultFilter
}

function query(filterBy) {
  console.log(filterBy);
  // return httpService.get('review', { params: { filterBy} })
  // var queryStr = (!filterBy) ? '' : `?toyId=${filterBy.toyId}`
  return httpService.get(`review`, filterBy)
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
}

async function add({ txt, toyId }) {

  const addedReview = await httpService.post(`review`, { txt, toyId })
  const aboutToy = await toyService.getById(toyId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutToy: {
      _id: aboutToy._id,
      name: aboutToy.name,
    }
  }

  // // reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function getDefaultFilter() {
  return { toyId: '' }
}