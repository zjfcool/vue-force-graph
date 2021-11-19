import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default function useGithubUrl() {
    const baseUrl = 'https://github.com/zjfcool/vue-force-graph/blob/main/examples/src/views'
    const router = useRouter()
    const githubUrl = ref()
    function getFileName(path: string) {
        if (path === '/') return '/home.vue';
        return path.replace(/_/g, '-') + '.vue'
    }
    router.beforeEach((to, from, next) => {
        const path = to.path;
        if (path) {
            githubUrl.value = baseUrl + getFileName(path)
        }
        next()
    })
    return githubUrl
}