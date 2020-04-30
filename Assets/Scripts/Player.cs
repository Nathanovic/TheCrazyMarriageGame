using UnityEngine;

public class Player : MonoBehaviour {

	public float MoveSpeed;
	public float MovementSmoothing;
	public float JumpForce;
	public Transform GroundCheck;
	public LayerMask GroundCheckMask;
	public SpriteRenderer spriteRenderer;
	public Vector2 GroundCheckSize;
	public bool ControlInAir = true;
	public float GroundCheckDistance;
	public float MaxJumpButtonCorrectionTime;

	private new Rigidbody2D rigidbody;
	private bool isGrounded;
	private bool jumpButtonDown;
	private float jumpButtonTime;

    private void Awake() {
		rigidbody = GetComponent<Rigidbody2D>();
    }

	private void Update() {
		if (!GameManager.Instance.IsPlaying) { return; }
		if (jumpButtonDown) {
			if ((Time.time - jumpButtonTime) > MaxJumpButtonCorrectionTime) {
				jumpButtonDown = false;
			}
		}

		if (!jumpButtonDown) {
			jumpButtonDown = Input.GetKeyDown(KeyCode.Space) || Input.GetMouseButtonDown(0);
			if (jumpButtonDown) {
				jumpButtonTime = Time.time;
			}
		}
	}

	private void FixedUpdate() {
		if (!GameManager.Instance.IsPlaying) { return; }
		bool hitGround = Physics2D.BoxCast(GroundCheck.position, GroundCheckSize, 0f, Vector2.down, GroundCheckDistance, GroundCheckMask);
		if (hitGround || ControlInAir) {
			float moveInput = Input.GetAxis("Horizontal");
			if (moveInput != 0f) {
				bool lookLeft = moveInput < 0f;
				spriteRenderer.flipX = lookLeft;
			}
			Vector3 targetVelocity = new Vector2(moveInput * MoveSpeed, rigidbody.velocity.y);
			Vector3 velocity = Vector3.zero;
			rigidbody.velocity = Vector3.SmoothDamp(rigidbody.velocity, targetVelocity, ref velocity, MovementSmoothing);
		}
		
		if (hitGround && jumpButtonDown) {
			jumpButtonDown = false;
			rigidbody.velocity = new Vector2(rigidbody.velocity.x, 0f);
			rigidbody.AddForce(new Vector2(0f, JumpForce));
		}
    }
	
	private void OnDrawGizmos(){
		Gizmos.color = Color.gray;
		Gizmos.DrawLine(GroundCheck.position, GroundCheck.position + Vector3.down * GroundCheckDistance);
	}

}