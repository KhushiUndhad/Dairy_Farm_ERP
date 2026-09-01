import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaCalendarTimes,
} from "react-icons/fa";

import "./EmployeeAttendance.css";

const EmployeeAttendance = () => {

  const attendanceData = [
    {
      date: "01 Sep 2026",
      day: "Tuesday",
      checkIn: "08:02 AM",
      checkOut: "05:10 PM",
      hours: "9h 08m",
      status: "Present",
    },
    {
      date: "02 Sep 2026",
      day: "Wednesday",
      checkIn: "08:15 AM",
      checkOut: "05:05 PM",
      hours: "8h 50m",
      status: "Late",
    },
    {
      date: "03 Sep 2026",
      day: "Thursday",
      checkIn: "07:58 AM",
      checkOut: "05:12 PM",
      hours: "9h 14m",
      status: "Present",
    },
    {
      date: "04 Sep 2026",
      day: "Friday",
      checkIn: "--",
      checkOut: "--",
      hours: "--",
      status: "Leave",
    },
    {
      date: "05 Sep 2026",
      day: "Saturday",
      checkIn: "08:04 AM",
      checkOut: "05:00 PM",
      hours: "8h 56m",
      status: "Present",
    },
  ];

  const presentCount = attendanceData.filter(
    (item) => item.status === "Present"
  ).length;

  const lateCount = attendanceData.filter(
    (item) => item.status === "Late"
  ).length;

  const leaveCount = attendanceData.filter(
    (item) => item.status === "Leave"
  ).length;

  return (
    <div className="employee-attendance-page">

      {/* ================= HEADER ================= */}

      <div className="attendance-header">

        <div>
          <h1>Attendance</h1>

          <p>
            Track your daily attendance and working hours
          </p>
        </div>

        <div className="attendance-month">
          <FaCalendarCheck />

          <span>
            September 2026
          </span>
        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="attendance-summary">

        {/* TOTAL DAYS */}

        <div className="attendance-card">

          <div className="attendance-card-icon total">
            <FaCalendarCheck />
          </div>

          <div>
            <span>Total Days</span>
            <strong>{attendanceData.length}</strong>
          </div>

        </div>


        {/* PRESENT */}

        <div className="attendance-card">

          <div className="attendance-card-icon present">
            <FaCheckCircle />
          </div>

          <div>
            <span>Present</span>
            <strong>{presentCount}</strong>
          </div>

        </div>


        {/* LATE */}

        <div className="attendance-card">

          <div className="attendance-card-icon late">
            <FaClock />
          </div>

          <div>
            <span>Late</span>
            <strong>{lateCount}</strong>
          </div>

        </div>


        {/* LEAVE */}

        <div className="attendance-card">

          <div className="attendance-card-icon leave">
            <FaCalendarTimes />
          </div>

          <div>
            <span>Leave</span>
            <strong>{leaveCount}</strong>
          </div>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="attendance-table-card">

        <div className="attendance-table-title">

          <div>
            <h2>Attendance History</h2>

            <p>
              Your recent attendance records
            </p>
          </div>

          <span>
            {attendanceData.length} Records
          </span>

        </div>


        <div className="attendance-table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

              {attendanceData.map((attendance, index) => (

                <tr key={index}>

                  <td>
                    <strong>
                      {attendance.date}
                    </strong>
                  </td>

                  <td>
                    {attendance.day}
                  </td>

                  <td>
                    {attendance.checkIn}
                  </td>

                  <td>
                    {attendance.checkOut}
                  </td>

                  <td>
                    {attendance.hours}
                  </td>

                  <td>

                    <span
                      className={`attendance-status ${attendance.status.toLowerCase()}`}
                    >

                      {attendance.status === "Present" && (
                        <FaCheckCircle />
                      )}

                      {attendance.status === "Late" && (
                        <FaClock />
                      )}

                      {attendance.status === "Leave" && (
                        <FaCalendarTimes />
                      )}

                      {attendance.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default EmployeeAttendance;