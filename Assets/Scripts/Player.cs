using UnityEngine;

public class Player : MonoBehaviour {

	public float MoveSpeed;
	public float JumpForce;
	public Transform GroundCheck;
	public float GroundCheckDistance;
	public float MaxJumpButtonCorrectionTime;

	private new Rigidbody2D rigidbody;
	private bool jumpButtonDown;
	private float jumpButtonTime;

    private void Awake() {
		rigidbody = GetComponent<Rigidbody2D>();
    }

	private void Update() {
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
		rigidbody.AddForce(Vector2.right * MoveSpeed);
		if (jumpButtonDown) {

			rigidbody.AddForce(Vector2.up * JumpForce);
		}
    }

}