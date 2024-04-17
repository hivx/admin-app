export enum MODALITY_TYPE_ATTRIBUTE_DEFAULT {
  /**
   * Dịch vụ chụp mặc định
   */
  PREFERRED_PROCEDURE = 'preferred_procedure',
  /**
   * Có KTV nhập KQ
   */
  REQUIRES_TRANSCRIBER = 'requires_transcriber',
  /**
   * Có KTV chụp
   */
  REQUIRES_TECHNICIAN = 'requires_technician',
  MINIMAL_REST_PERIOD = 'minimal_rest_period',
  /**
   * Yêu cầu có vật tư tiêu hao
   */
  REQUIRE_CONSUMABLE = 'require_consumable',
  /**
   * delay_time_to_operation <= thời gian thực hiện - thời gian chỉ định (second)
   */
  DELAY_TIME_TO_OPERATION = 'delay_time_to_operation',
  /**
   * delay_time_to_approval <= thời gian duyệt - thời gian thực hiện (second)
   */
  DELAY_TIME_TO_APPROVAL = 'delay_time_to_approval',
}

export type IModalityTypeAttribute = {
  id: string;
  name: string;
};

//   /**
//    * Dịch vụ chụp mặc định
//    */
//   preferredProcedure: IProcedureDTO;
//   /**
//    * Tự động chọn máy cho chỉ định
//    */
//   scheduleOrders: boolean;
//   /**
//    * Có KTV chụp
//    */
//   haveOperators: boolean;
//   /**
//    * Có KTV nhập KQ
//    */
//   haveTranscribers: boolean;
