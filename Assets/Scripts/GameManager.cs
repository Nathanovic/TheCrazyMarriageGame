using UnityEngine;

[DefaultExecutionOrder(-1)]
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
	
	public bool IsPlaying { get; private set; }

	public void Pause(bool isPaused) {
		IsPlaying = !isPaused;
	}

    private void Awake() {
		IsPlaying = true;
    }

}