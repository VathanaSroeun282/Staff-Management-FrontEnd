<template>
  <div class="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-xl mt-8">
    <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Edit Department' : 'Create Department' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block font-medium mb-1">Department Name</label>
        <input v-model="department.name" type="text" class="w-full border rounded px-3 py-2" required />
      </div>

      <div class="mt-6 flex justify-between">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
        <router-link to="/departments" class="text-gray-600 hover:underline">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { DepartmentAPI } from '@/end points/EndPointLinks'
import type { DepartmentWrite } from '@/types/Department'


export default defineComponent({
  setup() {
    const department = ref<DepartmentWrite>({
      departmentID: 0,
      departmentName: ''
    })

    const isEdit = ref(false)
    const route = useRoute()
    const router = useRouter()

    const fetchADepartment = async (id: number) => {
      const res = await axios.get<DepartmentWrite>(`${DepartmentAPI}/${id}`)
      department.value = res.data
    }

    const handleSubmit = async () => {
      try {
        if (isEdit.value) {
          await axios.put(`${DepartmentAPI}/${department.value.departmentID}`, {
            name: department.value.departmentName
          })
        } else {
          await axios.post(DepartmentAPI, {
            name: department.value.departmentName
          })
        }

        router.push('/departments')
      } catch (err) {
        console.error(err)
        alert('Error occurred.')
      }
    }

    onMounted(() => {
      const id = Number(route.params.id)
      if (id) {
        isEdit.value = true
        fetchADepartment(id)
      }
    })

    return {
      department,
      isEdit,
      handleSubmit,
    }
  },
})
</script>