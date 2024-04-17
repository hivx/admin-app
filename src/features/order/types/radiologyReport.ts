// after validation, we have several results that we can use
// to render the correct layout
export enum REPORT_PERMISSION {
  /**
   * The user can WRITE, SAVE DRAFT, and APPROVE report
   */
  FULL_PERMISSION = 'FULL_PERMISSION',
  /**
   * The user can WRITE and SAVE DRAFT but cannot APPROVE
   */
  DRAFT_ONLY = 'DRAFT_ONLY',
  /**
   * The user can only read
   */
  READ_ONLY = 'READ_ONLY',
}
