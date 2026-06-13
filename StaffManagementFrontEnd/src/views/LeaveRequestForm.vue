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
        {{ isEdit ? 'Edit Audit-Log' : 'Create Audit-Log' }}
      </h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block font-medium mb-1">Leave Request ID</label>
          <input type="text" v-model="leRequest.leaveRequestID" disabled class="w-full border rounded px-3 py-2">
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Leave Type</label>

          <select
            v-model="leRequest.leaveType"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled>Select Leave Type</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">Start Date</label>
          <input v-model="leRequest.startDate" type="date" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">End Date</label>
          <input v-model="leRequest.endDate" type="date" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Reason</label>
          <input type="text" v-model="leRequest.reason" class="w-full border rounded px-3 py-2">
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Status</label>

          <select
            v-model="leRequest.status"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled>Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <div v-if="isEdit" class="mb-4">
          <label class="block font-medium mb-1">Employee ID</label>
          <input v-model="leRequest.employeeID" type="number" disabled class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Employee Name</label>
          <br>
          <select
            v-model="leRequest.employeeName"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option disabled value="">Select Employee</option>
            <option
              v-for="staff in staffs"
              :key="staff.employeeID"
              :value="`${staff.firstName} ${staff.lastName}`"
            >
              {{ staff.firstName }} {{ staff.lastName }}
            </option>
          </select>
        </div>
        <div class="mt-6 flex justify-between">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/leaverequests" class="text-gray-600 hover:underline">
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
  import type { LeaveRequest } from '@/types/LeaveRequest'
  import type { Employee } from '@/types/Employee'
  import {  EmployeeAPI, LeaveRequestAPI } from '@/end points/EndPointLinks'

  export default defineComponent({
    setup() {
      const isLoading = ref(true)
      const leRequest = ref<LeaveRequest>({
          leaveRequestID : 0,
          leaveType : "",
          startDate : "",
          endDate: "",
          reason: "",
          status: "",
          employeeID: 0,
          employeeName : ""
      });

//------Default Variable
      const staffs = ref<Employee[]>([])
      const isEdit = ref(false)
      const route = useRoute()
      const router = useRouter()
//------Default functions
      const fetchStaffs = async () => {
        const res = await axios.get<Employee[]>(EmployeeAPI)
        staffs.value = res.data
      }
      //Search for Staff ID by Name
      const getEmployeeIDByName = (name: string): number | 0 => {
        const staff = staffs.value.find(s => {
          const fullName = `${s.firstName} ${s.lastName}`.toLowerCase()
          return fullName === name.toLowerCase()
        })
        return staff ? staff.employeeID : 0
      }
 //---------------------------------------------------------
 /////Core fuction related to this actions
      const fetchLeaveRequestByID = async (id: number) => {
        const res = await axios.get<LeaveRequest>(`${LeaveRequestAPI}/${id}`)
        leRequest.value = {
          ...res.data,
          startDate: res.data.startDate.split('T')[0],
          endDate: res.data.endDate.split('T')[0],
        }
      }

      const handleSubmit = async () => {
        try {
          const payload = {
            leaveType: leRequest.value.leaveType,
            startDate: leRequest.value.startDate,
            endDate: leRequest.value.endDate,
            reason: leRequest.value.reason,
            employeeID: leRequest.value.employeeID
          }
          if (isEdit.value) {
            await axios.put(`${LeaveRequestAPI}/${leRequest.value.leaveRequestID}`, payload)
          } else {
            await axios.post(LeaveRequestAPI, payload)
          }

          router.push('/leaverequests')
        } catch (err) {
          console.error(err)
          alert('Error occurred.')
        }
      }
      onMounted(async () => {
        try{
          await fetchStaffs()

          const id = Number(route.params.id)
          if (!isNaN(id) && id > 0) {
            isEdit.value = true
            await fetchLeaveRequestByID(id)
          }
        }finally{
          isLoading.value = false;
        }
      })

      return {
        isLoading,
        leRequest,
        isEdit,
        staffs,
        handleSubmit
      }
    },
  })
  </script>