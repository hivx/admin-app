import { TICKET_ELEMENT_ID } from './../../types/ticket';
export default `
<head>
  <style>
    .content {
      margin-bottom: 10px;
    }
  </style>
</head>
<div
  style="
    width: 350px;
    height: 450px;
    margin: auto;
    page-break-after: always;
    margin-top: 16px;
  "
>
  <div
    class="title-container"
    style="display: flex; flex-direction: row; justify-content: space-between"
  >
    <div>
      <div style="margin: 5px; margin-left: 10px; margin-right: 10px">
        <div class="logo">
          <svg
            width="70"
            height="70"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="44.5" stroke="#034EA1" stroke-width="7" />
            <path
              d="M19.5 71.5C35.1 53.5 27.3333 33 21.5 25H32.5C42.5 43.4 35.6667 63.6667 31 71.5H19.5Z"
              fill="#034EA1"
            />
            <path
              d="M77 72C61.5294 53.8065 69.2316 33.086 75.0166 25H64.1078C54.1908 43.5978 60.9674 64.0824 65.5954 72H77Z"
              fill="#034EA1"
            />
            <rect
              x="71.9999"
              y="43"
              width="10"
              height="48"
              transform="rotate(89.9229 71.9999 43)"
              fill="#EC1C24"
            />
            <rect
              x="53"
              y="72"
              width="10"
              height="48"
              transform="rotate(-180 53 72)"
              fill="#EC1C24"
            />
            <path d="M48 40.5V60.5" stroke="white" stroke-linecap="round" />
            <circle cx="48" cy="40" r="1" fill="white" />
            <path
              d="M46.9877 42C46.1544 42.3333 44.9877 43.2 46.9877 44C50.1544 44.6667 54.5877 46.4 46.9877 48C45.4877 48.5 43.3877 49.8 46.9877 51C49.8211 51.6667 53.7878 53.2 46.9877 54C45.6544 54.3333 43.7878 55.3 46.9877 56.5C49.3211 57 52.5878 58.2 46.9877 59"
              stroke="white"
              stroke-linecap="round"
            />
            <path
              d="M48 28L48.8981 30.7639H51.8042L49.4531 32.4721L50.3511 35.2361L48 33.5279L45.6489 35.2361L46.5469 32.4721L44.1958 30.7639H47.1019L48 28Z"
              fill="#FFCA05"
            />
          </svg>
        </div>
      </div>
      <div>KHOA CDHA-TDCN</div>
    </div>
    <div>
      <div style="margin: 5px; margin-left: 10px; margin-right: 10px">
        <svg  
         id="${TICKET_ELEMENT_ID.PATIENT_BARCODE}">
        </svg>
      </div>

    </div>
  </div>
  <table style="width: 100%">
    <tbody>
      <tr>
        <td>
          <div>
            <div
              class="content"
              id="${TICKET_ELEMENT_ID.PATIENT_NAME}"
              style="
                text-align: center;
                font-weight: 700;
                font-size: 30px;
                font-family: 'Roboto';
              "
            >
              Nguyeen Van A
            </div>
            <div
              class="content"
              style="
                text-align: center;
                font-weight: 700;
                font-size: 20px;
                font-family: 'Roboto';
              "
            >
              <span
                style="font-weight: 700; font-size: 50px"
                id="${TICKET_ELEMENT_ID.QUEUE_NUMBER}"
                >001</span
              >
            </div>
            <div
              class="content"
              style="
                text-align: center;
                font-weight: 700;
                font-size: 26px;
                font-family: 'Roboto';
              "
            >
              <span
                style="font-weight: 700; font-size: 30px; font-family: 'Roboto'"
                id="${TICKET_ELEMENT_ID.ROOM}"
                >X-QUANG 1</span
              >
            </div>

            <div
              class="content"
              style="
                text-align: center;
                font-weight: 400;
                font-size: 16px;
                font-family: 'Roboto';
              "
            >
              Ngày in:
              <span id="${TICKET_ELEMENT_ID.TICKET_CREATED_DATE}">xxx xxx xx</span>
            </div>

            <div
              class="content"
              style="
                text-align: center;
                font-weight: 400;
                font-size: 16px;
                font-family: 'Roboto';
              "
            >
              (Quý khách vui lòng giữ phiếu in để lấy kết quả.)
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>



`;
