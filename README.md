## Vue WeChat PC
[![NPM version](https://img.shields.io/npm/v/vue-wechat-pc.svg?style=flat)](https://npmjs.com/package/vue-wechat-pc)
[![NPM downloads](https://img.shields.io/npm/dm/vue-wechat-pc.svg?style=flat)](https://npmjs.com/package/vue-wechat-pc)
> 仿造PC版的微信实现的信息展示类组件，用于对话形式（如讨价还价的过程等）的数据展示。

![](http://assets-cdn.99plas.com/packages/wechat-example.png?t=20200413)

## Installation

```javascript
npm install --save vue-wechat-pc
# or
yarn add vue-wechat-pc
```

## Usage

### demo.vue

```javascript
<template>
    <WeChat
        style="height: 500px;"
        :otherUser.sync="userId"
        :user="users[1]"
        :userList="users"
        :messageList="messageList"
    />
</template>

<script>
import 'vue-wechat-pc/dist/index.css';
import { WeChat } from 'vue-wechat-pc';
export default {
    data () {
        return {
            users: [{
                id: 1,
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585943958566&di=38ae311becf29781df3313190e6e2f12&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D86853839%2C3576305254%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D750%26h%3D390',
                name: 'willem',
                time: '2020-04-03',
                summary: 'This is summay'
            }, {
                id: 2,
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585943958566&di=38ae311becf29781df3313190e6e2f12&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D86853839%2C3576305254%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D750%26h%3D390',
                name: 'wei',
                time: '2019-04-03',
                summary: 'This is summay123123'
            }],
            messageList: [
                { id: 3, content: 'ccc 123123 123123123    123123', time: '2020-04-07 14:51:05', other: false },
                { id: 2, content: 'bbb', time: '2020-04-07 14:50:31', other: true },
                { id: 1, content: 'aaa', time: '2020-04-07 14:50:30', other: false }
            ],
            userId: 1
        };
    },

    components: {
        WeChat
    }
}
</script>

```

## Options

- **`userList: `** `Array`

用户列表。默认值：`[]`。字段必须包括 **id** `Number|String` 用户Id, **avatar** `String` 用户头像, **name** `String` 用户名, **time** `String` 产生的最后对话的时间, **summary** `String` 产生的最后对话的摘要。以上属性可通过修改`userProps`（下面有说明）属性修改字段映射关系。当未传入**avatar**字段时，默认使用**name**显示 - 包含中文则显示第一个字，全英文则显示前两个单词的首字母大写。

```javascript
[{
    id: 1,
    avatar: 'https://baidu.com/1.png',
    name: 'willem',
    time: '2020-04-03',
    summary: 'Test Test Test'
}]
```

- **`messageList: `** `Array`

当前用于显示的信息列表。默认值：`[]`。字段必须包括 **id** `Number|String` 消息Id, **content** `String` 消息内容, **time** `String` 消息产生的时间, **other** `Boolean` 是否是对方发出的消息, **background** `String` 消息气泡的背景色(此项可不填)。以上属性可通过修改`messageProps`（下面有说明）属性修改字段映射关系。

```javascript
[{ 
    id: 3, 
    content: 'ccc 123123 123123123    123123', 
    time: '2020-04-07 14:51:05', 
    other: false 
}]
```

- **`userProps: `** `Object`

修改userList字段的映射关系。默认值：

```javascript
{
    id: 'id',
    avatar: 'avatar',
    name: 'name',
    time: 'time',
    summary: 'summary'
}
```

- **`messageProps: `** `Object`

修改messageList字段的映射关系。默认值：

```javascript
{
    id: 'id',
    content: 'content',
    time: 'time',
    other: 'other',
    background: 'background'
}
```

- **`user: `** `Object`

表示默认用户（即聊天中的“我”）。用于消息列表的信息展示。

- **`otherUser`** `String|Number`

当前处于对话框状态的用户（即聊天中的“对方”）。可使用sync修饰符进行双向绑定。

- **`usersWidth: `** `String|Number`

用户列表的宽度。默认值：`300px`。

- **`userDateFormat: `** `String|Function(time)`

用户列表显示用户最后对话的时间格式化字符串。默认值：`MM/DD/YYYY`。当传入Function时，需要返回一个字符串用于显示。

- **`messageDateFormat: `** `String|Function(time)`

消息列表时间格式化字符串。默认值：`MM/DD/YYYY HH:mm`。当传入Function时，需要返回一个字符串用于显示。

- **`popMaxWidth: `** `String|Number`

消息气泡的最大长度。默认值：`50%`。

- **`placeholder: `** `String`

搜索框的placeholder值。默认值：`Search`。

- **`scrollToBottom: `** `Boolean`

消息框是否默认滚动到最下面。默认值：`true`。

## SlotScopes

- **`messageItem`**

用于自定义消息显示内容。

```javascript
<WeChat>
    <div slot="messageItem" slot-scope="message">{{ message.id }}</div>
</WeChat>
```
