<template>
    <div style="margin: 32px;">
        <PopMessage />
        <Avatar title="韦双健" />
        <Avatar title="Willem wei company" />
        <WeChat
            style="height: 500px;"
            :user="users[1]"
            :userList="users"
            :otherUser="1"
            :messageList="messageList"
            :messageProps="{time: 'a'}"
            :update:otherUser="userChange"
            defaultAvatar="123"
        >
            <template slot="messageItem" slot-scope="message">{{ message.content }}123</template>
        </WeChat>
    </div>
</template>

<script>
import { WeChat, PopMessage, Avatar } from '@/main';

export default {
    data () {
        return {
            users: [{
                id: 1,
                avatar: 'http://dev-cdn2.mindertech.net/2019/1205/FkF6PxDPKM_2sA1UgpSEHF3zdDfO.jpg!origin',
                name: 'ABD SAD',
                summary: 'This is summay'
            }, {
                id: 2,
                // avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585943958566&di=38ae311becf29781df3313190e6e2f12&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D86853839%2C3576305254%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D750%26h%3D390',
                name: 'AA AX ',
                summary: 'This is summay123123'
            }],
            messageList: [
                { id: 3, content: 'ccc 123123 123123123    123123', a: '2020-04-07 14:51:05', other: false },
                { id: 2, content: 'bbb', a: '2020-04-07 14:50:31', other: true, background: '#f00' },
                { id: 1, content: 'aaa', a: '2020-04-07 14:50:30', other: false },
                { id: 4, content: 'aaa', a: '2020-04-07 14:50:30', other: true },
                { id: 5, content: 'aaa', a: '2020-04-07 14:50:30', other: true },
                { id: 6, content: 'aaa', a: '2020-04-07 14:50:30', other: true },
                { id: 7, content: 'aaa', a: '2020-04-07 14:50:30', other: false },
                { id: 8, content: 'aaa', a: '2020-04-07 14:50:30', other: false }
            ],
            userId: 1
        };
    },

    components: {
        WeChat,
        PopMessage,
        Avatar
    },

    methods: {
        userChange (id) {}
    }
}
</script>

<style>
body,
html {
    margin: 0;
    padding: 0;
}
</style>
