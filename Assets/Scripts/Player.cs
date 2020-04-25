using UnityEngine;

public class Player : MonoBehaviour {

	public float MoveSpeed;

	private new Rigidbody2D rigidbody;

    private void Awake() {
		rigidbody = GetComponent<Rigidbody2D>();
    }

    private void FixedUpdate() {
		if (!GameManager.Instance.IsPlaying) { return; }
		rigidbody.AddForce(Vector2.right * MoveSpeed);
    }

}