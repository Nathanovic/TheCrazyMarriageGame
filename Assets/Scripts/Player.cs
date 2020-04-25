using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour {

	public float MoveSpeed;
    
    private void Awake() {
        
    }

    private void Update() {
		transform.Translate(Vector3.right * MoveSpeed * Time.deltaTime);
    }

}