  <template>
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>
    <div v-else class="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-xl mt-8">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Edit Role' : 'Create New Role' }}
      </h1>

      <form @submit.prevent="handleSubmit">
        <div v-if="isEdit" class="mb-4">
          <label class="block font-medium mb-1">Role ID</label>
          <input type="text" v-model="role.roleID" disabled class="w-full border rounded px-3 py-2">
        </div>
        <div v-else class="mb-4">
          <label class="block font-medium mb-1">Role ID</label>
          <input type="text" value="No Need to Input!" disabled class="w-full border rounded px-3 py-2">
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">RoleName</label>
          <input v-model="role.roleName" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mt-6 flex justify-between">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/roles" class="text-gray-600 hover:underline">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import { RoleAPI } from '@/end points/EndPointLinks'
  import type { Role } from '@/types/Role'

  export default defineComponent({
    setup() {
      const isLoading = ref(true)
      const role = ref<Role>({
          roleID : 0,
          roleName: ""
      });

//------Default Variable
      const isEdit = ref(false)
      const route = useRoute()
      const router = useRouter()
//------Default functions
// N/A
 //---------------------------------------------------------
 /////Core fuction related to this actions
      const fetchRoleByID = async (id: number) => {
      const res = await axios.get<Role>(`${RoleAPI}/${id}`)
        role.value = {
          roleID: res.data.roleID,
          roleName: res.data.roleName,
        }
      }

      const handleSubmit = async () => {
        try {
          const payload = {
            roleName: role.value.roleName
          }
          if (isEdit.value) {
            await axios.put(`${RoleAPI}/${role.value.roleID}`, payload)
          } else {
            await axios.post(RoleAPI, payload)
          }

          router.push('/roles')
        } catch (err) {
          console.error(err)
          alert('Error occurred: ' + err)
        }
      }
      onMounted(async () => {
        try{
          const id = Number(route.params.id)
          if (!isNaN(id) && id > 0) {
            isEdit.value = true
            await fetchRoleByID(id)
          }
        }finally{
          isLoading.value = false;
        }
      })

      return {
        isLoading,
        role,
        isEdit,
        handleSubmit
      }
    },
  })
  </script>