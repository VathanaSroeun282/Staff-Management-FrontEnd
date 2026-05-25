<template>
  <div class="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEdit ? 'Edit Staff' : 'Create Staff' }}
    </h1>

    <form @submit.prevent="handleSubmit">
      <!-- First Name -->
      <div class="mb-4">
        <label class="block font-medium mb-1">First Name</label>
        <input v-model="staff.firstName" type="text" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Last Name -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Last Name</label>
        <input v-model="staff.lastName" type="text" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Date of Birth -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Date of Birth</label>
        <input v-model="staff.dateOfBirth" type="date" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Position -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Position</label>
        <input v-model="staff.position" type="text" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Date Hired -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Date Hired</label>
        <input v-model="staff.hireDate" type="date" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Salary -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Salary</label>
        <input v-model.number="staff.salary" type="number" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Email</label>
        <input v-model="staff.email" type="email" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Phone -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Phone</label>
        <input v-model="staff.phoneNumber" type="tel" class="w-full border rounded px-3 py-2" required />
      </div>

      <!-- Status -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Status</label>
        <select v-model="staff.status" class="w-full border rounded px-3 py-2" required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Department -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Department</label>
        <select v-model="staff.departmentID" class="w-full border rounded px-3 py-2" required>
          <option disabled value="">-- Select Department --</option>
          <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
            {{ dept.departmentName }}
          </option>
        </select>
      </div>

      <!-- Role -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Role</label>
        <select v-model="staff.roleID" class="w-full border rounded px-3 py-2" required>
          <option disabled value="">-- Select Role --</option>
          <option v-for="role in roles" :key="role.roleID" :value="role.roleID">
            {{ role.roleName }}
          </option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="mt-6 flex justify-between">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
        <router-link to="/staff" class="text-gray-600 hover:underline">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { EmployeeAPI, DepartmentAPI, RoleAPI } from '@/end points/EndPointLinks'
import type { EmployeeWrite } from '@/types/Employee'
import type { DepartmentWithEmployees } from '@/types/Department'
import type { RoleWithEmployees } from '@/types/Role'

export default defineComponent({
  setup() {
    const staff = ref<EmployeeWrite>({
      employeeID: undefined,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      position: '',
      hireDate: '',
      salary: 0,
      email: '',
      phoneNumber: '',
      status: 'Active',
      departmentID: null,
      roleID: null,
    })

    const departments = ref<DepartmentWithEmployees[]>([])
    const roles = ref<RoleWithEmployees[]>([])
    const route = useRoute()
    const router = useRouter()
    const isEdit = ref(false)

    const fetchDepartments = async () => {
      const res = await axios.get<DepartmentWithEmployees[]>(DepartmentAPI)
      departments.value = res.data
    }

    const fetchRoles = async () => {
      const res = await axios.get<RoleWithEmployees[]>(RoleAPI)
      roles.value = res.data
    }

    const fetchStaff = async (id: number) => {
      const { data } = await axios.get(`${EmployeeAPI}/${id}`)
      staff.value = {
        employeeID: data.employeeID,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth.split('T')[0],
        position: data.position,
        hireDate: data.hireDate.split('T')[0],
        salary: data.salary,
        email: data.email,
        phoneNumber: data.phoneNumber,
        status: data.status,
        departmentID: departments.value.find(d => d.departmentName === data.departmentName)?.departmentID ?? null,
        roleID: roles.value.find(r => r.roleName === data.roleName)?.roleID ?? null,
      }
    }

    const handleSubmit = async () => {
      if (isEdit.value && staff.value.employeeID) {
        await axios.put(`${EmployeeAPI}/${staff.value.employeeID}`, staff.value)
      } else {
        await axios.post(EmployeeAPI, staff.value)
      }
      router.push('/')
    }

    onMounted(async () => {
      await Promise.all([fetchDepartments(), fetchRoles()])
      const id = route.params.id
      if (id) {
        isEdit.value = true
        await fetchStaff(Number(id))
      }
    })

    return {
      staff,
      departments,
      roles,
      handleSubmit,
      isEdit,
    }
  },
})
</script>