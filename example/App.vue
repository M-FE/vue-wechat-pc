<script>
import UserList from '@/components/UserList';
import PopMessage from '@/components/PopMessage';
import '@/main';

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
            }]
        };
    },

    components: {
        UserList,
        PopMessage
    },

    render () {
        return (
            <div>
                <UserList users={this.users} />
                <PopMessage style="margin: 10px;">1</PopMessage>
                <PopMessage style="margin: 10px;" placement="right">这是一个测试测试测试测</PopMessage>
            </div>
        );
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
