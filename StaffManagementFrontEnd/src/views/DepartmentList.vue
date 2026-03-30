<template>
  <div v-if="loading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      alt="loading"
      class="w-60 h-60 object-contain rounded-lg"
    />

    <h1 class="text-lg font-semibold text-gray-700 animate-pulse">
      Loading...
    </h1>
  </div>
  <div v-else class="p-6">
    <h1 class="text-2xl font-bold mb-4">Department List</h1>

    <router-link
      to="/departments/create"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add Department
    </router-link>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 border">Name</th>
          <th class="px-4 py-2 border">Employees</th>
          <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="departments.length === 0">
          <td colspan="3" class="text-center py-4">No departments found</td>
        </tr>
        <tr v-for="department in departments" :key="department.departmentID">
          <td class="border px-4 py-2">{{ department.departmentName }}</td>
          <td v-if="department.employeeNames.length === 0" class="border px-4 py-2">N/A</td>
          <td v-else class="border px-4 py-2">{{ department.employeeNames.join(", ") }}</td>
          <td class="border px-4 py-2">
            <router-link
              :to="`/departments/edit/${department.departmentID}`"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>
            <button
              @click="deleteDepartment(department.departmentID)"
              class="text-red-600 hover:underline ml-4"
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
import type { DepartmentWithEmployees } from '@/types/Department'
import { DepartmentAPI } from '@/end points/EndPointLinks'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const departments = ref<DepartmentWithEmployees[]>([])

    const loadDepartments = async () => {
      loading.value = true
      try {
          const res = await axios.get<DepartmentWithEmployees[]>(DepartmentAPI)
          departments.value = res.data
      } finally {
        loading.value = false
      }
    }

    const deleteDepartment = async (id: number) => {
      const confirmDelete = confirm('Are you sure you want to delete this department?')
      if (!confirmDelete) return

      try {
        await axios.delete(`${DepartmentAPI}/${id}`)
        
        // Option 1: Reload from API (safe way)
        await loadDepartments()

        // Option 2 (faster): remove locally (if you want no API reload)
        // departments.value = departments.value.filter(d => d.departmentID !== id)

      } catch (error) {
        console.error('Delete failed:', error)
        alert('Failed to delete department')
      }
    }

    onMounted(() => {
      loadDepartments()
    })

    return {
      departments,
      deleteDepartment,
      loading
    }
  },
})
</script>