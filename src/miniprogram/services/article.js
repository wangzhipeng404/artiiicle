import mpx from '@mpxjs/core'
const db = mpx.cloud.database({
  env: 'artiiicle-0g6tol773350b53b',
})
const _ = db.command

export function find ({ keyword, page = 1, limit = 10 }) {
  return db.collection('article').where(keyword ? _.or([
    {
      title: {
        $regex: `.*${keyword}.*`,
        $options: '1',
      },
    },
    {
      tags: keyword,
    },
  ]) : {}).skip((page - 1) * limit).limit(limit).get().then(res => {
    return res.data
  })
}

export function get (id) {
  if (!id) throw new Error('请传入id')
  return db.collection('todos').doc('todo-identifiant-aleatoire').get().then(res => {
    return res.data[0]
  })
}

export function add ({ title, tags, content }) {
  return db.collection('article').add({
    data: {
      createTime: new Date(),
      updateTime: new Date(),
      title,
      tags,
      content,
    },
  }).then(res => {
    console.log(res)
  })
}

export function update (id, data) {
  if (!id) {
    throw new Error('缺少id')
  }
  return db.collection('article').doc(id).update({
    data: {
      ...data,
      updateTime: new Date(),
    },
  }).then(res => {
    console.log(res)
  })
}

export function remove (id) {
  if (!id) {
    throw new Error('缺少id')
  }
  return db.collection('todos').doc(id).remove().then(res => {
    console.log(res)
  })
}
