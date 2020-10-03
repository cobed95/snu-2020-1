import axios from "axios"
import fs from "fs"

const MAX_IMAGES = 115

const classOneUrlColAddr = "http://image-net.org/api/text/imagenet.synset.geturls?wnid=n02110185"
const classTwoUrlColAddr = "http://image-net.org/api/text/imagenet.synset.geturls?wnid=n02110063"

const CLASS_ONE_NAME = "husky"
const CLASS_TWO_NAME = "malamute"

const flickr = "flickr"

var classOneIdx = 115
var classTwoIdx = 83

const newClassOneName = () => {
  classOneIdx++
  return `images/${CLASS_ONE_NAME}/${CLASS_ONE_NAME}${classOneIdx}.jpg`
}

const newClassTwoName = () => {
  classTwoIdx++
  return `images/${CLASS_TWO_NAME}/${CLASS_TWO_NAME}${classTwoIdx}.jpg`
}

const fromFlickr = url => {
  const splitted = url.split(".")
  return splitted[1] === flickr || splitted[2] === flickr 
}

const reflect = p => p.then(v => ({ url: v.config.url, fulfilled: true }),
                            e => ({ fulfilled: false }))

const downloadSingleImage = (url, isClassOne) => {
  return axios.get(url, { responseType: "stream" })
    .then(res => {
      const newName = isClassOne ? newClassOneName() : newClassTwoName()
      const writer = fs.createWriteStream(newName)
      res.data.pipe(writer)
      return new Promise((resolve, reject) => {
        writer.on("finish", resolve)
        writer.on("error", reject)
      })
    })
}

const getValidUrls = urls => {
  return Promise.all(
    urls.map(axios.get).map(reflect)
  ).then(results => {
    return results.filter(res => res.fulfilled).map(success => success.url)
  })
}

const download = (validUrls, isClassOne) => {
  return Promise.all(
    validUrls.map(url => downloadSingleImage(url, isClassOne))
  )
}

const getImagesOfClass = (urls, isClassOne) => {
  getValidUrls(urls)
    .then(validUrls => download(validUrls, isClassOne))
    .catch(err => console.error(err))
}

const urlColAddresses = [classOneUrlColAddr, classTwoUrlColAddr]
const requestsForUrls = urlColAddresses.map(addr => axios.get(addr))

const run = async () => {
  // const filteredUrlLists = await Promise.all(requestsForUrls)
  //   .then(results => results.map(res => res.data))
  //   .then(strings => strings.map(str => str.split("\r\n")))
  //   .then(urlLists => urlLists.map(urlList => urlList.filter(fromFlickr)))
  //   .catch(err => console.error(err))

  // let [ classOneUrls, classTwoUrls ] = filteredUrlLists
  // classOneUrls = classOneUrls.slice(116, 116 + MAX_IMAGES)
  // classTwoUrls = classTwoUrls.slice(84, 84 + MAX_IMAGES)

  // getImagesOfClass(classOneUrls, true)
  // getImagesOfClass(classTwoUrls, false)
  axios.get("https://snusr.snu.ac.kr/activities/student-volunteer-course/notice")
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
}

run()
