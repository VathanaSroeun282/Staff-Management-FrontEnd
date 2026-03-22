<template>
  <div class="p-6">
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
          <th class="px-4 py-2 border">Description</th>
          <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="department in departments" :key="department.id">
          <td class="border px-4 py-2">{{ department.name }}</td>
          <td class="border px-4 py-2">{{ department.description }}</td>
          <td class="border px-4 py-2">
            <router-link
              :to="`/departments/edit/${department.id}`"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>
            <button
              @click="deleteDepartment(department.id)"
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
interface Department {
  id: number
  name: string
  description: string
}

export default defineComponent({
  setup() {
    const departments = ref<Department[]>([])

    const loadDepartments = async () => {
      const res = await axios.get('http://localhost:5212/api/Department')
      departments.value = res.data
    }

    const deleteDepartment = async (id: number) => {
      if (confirm('Are you sure you want to delete this department?')) {
        await axios.delete(`http://localhost:5212/api/Department/DeleteDepartment/${id}`)
        await loadDepartments()
      }
    }

    onMounted(() => {
      loadDepartments()
    })

    return {
      departments,
      deleteDepartment,
    }
  },
})
</script>
