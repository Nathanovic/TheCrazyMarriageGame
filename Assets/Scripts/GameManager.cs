using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour {

	public static GameManager Instance {
		get {
			if (instance == null) {
				instance = new GameObject().AddComponent<GameManager>();
			}
			return instance;
		}
	}

	private static GameManager instance;
    
    private void Awake() {
		    
    }

    private void Update() {
	 
    }

}