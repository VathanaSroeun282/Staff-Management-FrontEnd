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

interface Department {
  id?: number
  name: string
}

export default defineComponent({
  setup() {
    const department = ref<Department>({ name: '' })
    const isEdit = ref(false)
    const route = useRoute()
    const router = useRouter()

    const fetchDepartment = async (id: number) => {
      const res = await axios.get(`http://localhost:5212/api/Department/GetDepartmentById/${id}`)
      department.value = res.data
    }

    const handleSubmit = async () => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }

    if (isEdit.value && department.value.id) {
      // PUT request with departmentName as query parameter, no body
      await axios.put(
        `http://localhost:5212/api/Department/UpdateDepartment/${department.value.id}?departmentName=${encodeURIComponent(department.value.name)}`,
        null,
        config
      )
    } else {
      // POST request with department name in JSON body
      await axios.post(
        `http://localhost:5212/api/Department/AddDepartment`,
        { name: department.value.name },
        config
      )
    }

    router.push('/departments')
  } catch (err) {
    console.error(err)
    alert('ERRRRRRRRR — check the console for details')
  }
}

    onMounted(() => {
      const id = route.params.id
      if (id) {
        isEdit.value = true
        fetchDepartment(Number(id))
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