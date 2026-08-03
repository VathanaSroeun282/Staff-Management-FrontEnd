<template>
  <div v-if="loading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>

  <div v-else class="p-6">
    <div class="w-full grid grid-flow-col">
      <h1 class="col-auto text-2xl font-bold mb-4">Role List</h1>
      <button class="col-auto flex justify-end">
        <router-link
          to="/role/create"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block font-semibold"
        >
        Create New Role
        </router-link>
      </button>
    </div>    
    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Role Name</th>
          <th class="border px-4 py-2">Employees</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="roles.length === 0">
          <td colspan="5" class="text-center py-4">No attendances found</td>
        </tr>

        <tr v-for="role in roles" :key="role.roleID">
          <td class="border px-4 py-2 text-center">{{ role.roleID }}</td>
          <td class="border px-4 py-2">{{ role.roleName }}</td>
          <td class="border px-4 py-2">
             <div v-if="role.employeeName && role.employeeName.length">
              <ul class="space-y-2">
                <li
                  v-for="(employee, index) in role.employeeName"
                  :key="index"
                  class="rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                >
                  {{ employee }}
                </li>
              </ul>
            </div>
            <div v-else class="rounded-lg px-4 py-2 bg-gray-700 text-white bg-opacity-65">
              No employees assigned
            </div>
          </td>
          <td class="border px-4 py-2">
            <router-link
              :to="{ name:'role-edit',params:{id: role.roleID} }"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>

            <button
              @click="deleteRole(role.roleID)"
              class="text-red-600 ml-4"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import type { RoleWithEmployees } from '@/types/Role'
import { RoleAPI } from '@/end points/EndPointLinks'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const roles = ref<RoleWithEmployees[]>([])

    const loadRole = async () => {
      loading.value = true
      try {
        const res = await axios.get<RoleWithEmployees[]>(RoleAPI)
        roles.value = res.data
      } finally {
        loading.value = false
      }
    }

    const deleteRole = async (id: number) => {
      if (!confirm('Are you sure you want to delete this Role?')) return

      try {
        await axios.delete(`${RoleAPI}/${id}`)

        // 🔥 instant update (no reload)
        roles.value = roles.value.filter(a => a.roleID !== id)

      } catch (error) {
        console.error(error)
        alert('Delete failed')
      }
    }

    // 🔥 format datetime -> HH:mm
    const formatTime = (datetime: string) => {
      return datetime?.slice(11, 16)
    }

    onMounted(() => {
      loadRole()
    })

    return {
      roles,
      deleteRole,
      loading,
      formatTime
    }
  },
})
</script>